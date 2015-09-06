History = new Mongo.Collection("History");

if (Meteor.isClient) {


  var SoundBoard = function(dim,col,icon,sound, desc,idx){
   this.width = dim[0];
   this.height = dim[1];
   this.colour = col;
   this.icon = icon;
   this.sound = new buzz.sound(sound);
   this.description = desc;
   this.index = idx;
   this.stillPlaying = false;

   this.sound.bind("ended", function(e) {
     console.log(e);
    console.log(desc + ' Ended');
    eatSnds(History.find({},{sort:{"date": -1}}).fetch());
})

  //  SoundBoard.prototype.playSound = function () {
  //    this.stillPlaying = true;
  //   //  this.sound.stop();
  //    this.sound.play();
   //
   //
  //  };
  };


  var s1 = new SoundBoard([250,250],'#58A59D','fa-car','/sounds/truck.ogg','Zoom');
  var s2 = new SoundBoard([250,250],'#0A797D','fa-diamond','/sounds/pong.wav','Pong');
  var s3 = new SoundBoard([250,250],'#A2BA67','fa-adjust','/sounds/plop.ogg','Plop');
  sounds = [];

  sounds.push(s1);
  sounds.push(s2);
  sounds.push(s3);


  // var s = new buzz.sound('/sounds/truck.ogg');


  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    soundboards: function(){
      return sounds;
    },
    history: function(){
      return History.find({},{sort: { "date": -1 }} );
    }
  });

  Template.hello.events({
  'click button':function(){
    eatSnds( History.find({},{sort:{"date": -1}}).fetch() );
  }
  });

  Template.SoundBoard.events({
    'click .soundBtn': function () {
      // this.playSound();
      var dte = new Date();
      History.insert({idx:this.index,description:this.description,date:dte});

    }
  });


}

function eatSnds(snds){
  console.log(snds);
  try{
  var sb = snds.pop();
  History.remove({_id:sb._id});

  var elementPos = sounds.map(function(x) {return x.description; }).indexOf(sb.description);
  sounds[elementPos].sound.play();

 //  .bind("ended", function(e) {
 //    if(snds.length >= 1){
 //   eatSnds(snds);
 //  //  console.log(snds);
 // }

// });
}catch(e){}
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    return Meteor.methods({

      removeAll: function() {

        return History.remove({});

      }

    });
  });
}
