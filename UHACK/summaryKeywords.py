#!/usr/bin/python
# -*- coding: iso-8859-15 -*-
# from __future__ import absolute_import
# from __future__ import division, unicode_literals
import newspaper
from newspaper import Article
from nltk import word_tokenize, pos_tag, ne_chunk
import unicodedata
from nltk import word_tokenize, pos_tag, ne_chunk
from summy import lets_summarize
from nltk.chunk import conlltags2tree, tree2conlltags
from nltk.sentiment.vader import SentimentIntensityAnalyzer
#import googleImages
import re

# from sumy.parsers.html import HtmlParser
# from sumy.parsers.plaintext import PlaintextParser
# from sumy.nlp.tokenizers import Tokenizer
# from sumy.summarizers.lsa import LsaSummarizer as Summarizer
# from sumy.nlp.stemmers import Stemmer
# from sumy.utils import get_stop_words


# LANGUAGE = "english"
# SENTENCES_COUNT = 5
#
#
# def lets_summarize(url):
#     parser = HtmlParser.from_url(url, Tokenizer(LANGUAGE))
#     # or for plain text files
#     # parser = PlaintextParser.from_file("document.txt", Tokenizer(LANGUAGE))
#     stemmer = Stemmer(LANGUAGE)
#     summary = []
#     summarizer = Summarizer(stemmer)
#     summarizer.stop_words = get_stop_words(LANGUAGE)
#
#     for sentence in summarizer(parser.document, SENTENCES_COUNT):
#         summary.append(sentence)
#     return summary

def get_senti(text):

    sid = SentimentIntensityAnalyzer()
    ss = sid.polarity_scores(text)
    return ss

def entity(article,keys):
    buzzwords = []
    sentence = article
    def remove_non_ascii(text):
    	return ''.join([i if ord(i) < 128 else ' ' for i in text])
    buzzwords = []
    buzzwords_type = []
    sen = remove_non_ascii(sentence)

    chunks = ne_chunk(pos_tag(word_tokenize(sen)))
    iob_tagged = tree2conlltags(chunks)
    size = len(iob_tagged)
    k = 0
    for i in range(0,size):

        if iob_tagged[i][2] != 'O':

            sums = unicodedata.normalize('NFKD', iob_tagged[i][0]).encode('ascii','ignore')
            sums = sums.lower()
            buzzwords.append(sums)
            sums = unicodedata.normalize('NFKD', iob_tagged[i][2]).encode('ascii','ignore')
            sums = sums.lower()

            words = sums.split('-')
            buzzwords_type.append(words[1])
            k += 1
    return buzzwords,buzzwords_type

def extract_keywords(article,url1):

    article.download()
    article.parse()
    article.nlp()
    summary = article.summary
    if summary == '':
        summary = lets_summarize(url1)
            #summar = []
            #summary = unicodedata.normalize('NFKD', summary).encode('ascii','ignore')
            #summary = ''.join([i if ord(i) < 128 else ' ' for i in summary])
	size = len(summary)
	summary = str(summary)
	#print type(summary)
	#words = word_tokenize(str(summary))
	words = summary.split(' ')
	#print words
	to_remove = ['[<Sentence:',"{u'article':",'\n','<Sentence:']
	summary = []
	for wor in words:
		if wor not in to_remove:
			summary.append(wor)
	summary = ' '.join(summary)
	#words = summary.split('\n')
	summary = re.sub('[^a-zA-Z0-9 \n/\.]', '', summary)
	#print words
	#print summary
	keys = []
        for i in range(0,size):
            sums = unicodedata.normalize('NFKD', article.keywords[i]).encode('ascii','ignore')
            keys.append(sums)
        used = []
        buzzwords,buzzwords_type = entity(article.text,keys)
        i = 0
        gpe = []
        people = []
        organization = []
        random = []
        for best in buzzwords:

            if best in keys:
                if best in used:
                    continue
                used.append(best)
                if buzzwords_type[i]== 'gpe' or buzzwords_type[i]== 'geo':
                    gpe.append(best)
                elif buzzwords_type[i] == 'person' or buzzwords_type[i]=='per':
                    people.append(best)
                elif buzzwords_type[i] == 'organization'or buzzwords_type[i]=='org':
                    organization.append(best)
                else :
                    random.append(best)
            i += 1
        sentiment = get_senti(article.text)
        if sentiment['compound'] > 0.4 :
            sent = 'Positive'
        elif sentiment['compound'] < -0.4:
            sent = 'Negative'
        else:
            sent = 'Neutral'

        #links = googleImages.googleImg(keys);

        output = {
                        'summary': summary,
                        'people':people,
                        'place':gpe,
                        'organization':organization,
                        'random':random,
                        'sentiment_prob':sentiment,
                        'all_keywords':keys,
                        'sentiment': sent,
                        #'images':links
                        }
        #print type(output)

	#print output['summary']
        return output

def runFinal(url1 = "http://localhost:8082"):
    article = Article(url = url1)
    output = extract_keywords(article,url1)
    return output
