var natural = require('natural');
var classifier = new natural.BayesClassifier();

var politics = ["Cabinet", "Campaign", "Candidate", "Canvass", "Capitalize","Declaration", "Defeat", "Deficit", "Delegate", "Deliberate", "Deliberation", "Democracy", "Democrat", "Democratic", "Derision", "Destiny", "Diligent", "Diplomat", "Disapproval", "Discourse", "Discreet", "Discussion", "Disheartened", "Dishonesty", "Dissatisfaction", "District", "Distrust", "Diverse", "Division", "Dogma", "Dominate", "Donation", "Donor", "Dossier", "Dynamic"]
classifier.addDocument('i am long qqqq', 'buy');
