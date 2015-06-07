// counter starts at 0
Session.setDefault('successCountPost', 0);
Session.setDefault('failedCountPost', 0);
Session.setDefault('successCountGet', 0);
Session.setDefault('failedCountGet', 0);

Template.hello.helpers({
    successCountPost: function () {
        return Session.get('successCountPost');
    },
    failedCountPost: function () {
        return Session.get('failedCountPost');
    },
    successCountGet: function () {
        return Session.get('successCountGet');
    },
    failedCountGet: function () {
        return Session.get('failedCountGet');
    }
});

Template.hello.events({
    'click #post': function () {
        var options = {
            data: {hello: "world"},
            headers : {
                "x-foo" : '123',
                'Accept' : 'application/json'

            }
        };
        HTTP.call("POST", "/PostProxy", options, function(error, result) {
            if(error) {
                Session.set('failedCountPost', Session.get('failedCountPost') + 1);

            } else {
                // increment the counter when button is clicked
                Session.set('successCountPost', Session.get('successCountPost') + 1);
            }
        })
    },
    'click #get': function () {
        var options = {
            headers: {
                "x-foo" : '123',
                'Accept' : '*/*'
            }
        }
        HTTP.call("GET", "/GetProxy", options, function (error, result) {
            if (error) {
                Session.set('failedCountGet', Session.get('failedCountGet') + 1);

            } else {
                // increment the counter when button is clicked
                Session.set('successCountGet', Session.get('successCountGet') + 1);
            }
        })
    }
});

