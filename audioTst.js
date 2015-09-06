History = new Mongo.Collection("History");

if (Meteor.isClient) {

  var SoundBoard = function(dim,col,icon,sound, desc,track){
   this.width = dim[0];
   this.height = dim[1];
   this.colour = col;
   this.icon = icon;
   this.track = track;
   this.sound = new buzz.sound(sound);
   this.description = desc;

   this.sound.bind("ended", function(e) {
     eatSnds(History.find({track:track},{sort:{"date": -1}}).fetch());
})

  };


  var s1 = new SoundBoard([250,250],'#58A59D','fa-car','/sounds/truck.ogg','Zoom',0);
  var s2 = new SoundBoard([250,250],'#0A797D','fa-diamond','/sounds/pong.wav','Pong',0);
  var s3 = new SoundBoard([250,250],'#A2BA67','fa-adjust','/sounds/plop.ogg','Plop',1);
  var s4 = new SoundBoard([250,250],'#0A564D','fa-battery-three-quarters','/sounds/NFC.ogg','NFC',1);
  sounds = [];

  sounds.push(s1);
  sounds.push(s2);
  sounds.push(s3);
  sounds.push(s4);




  Template.track.helpers({
    sb1: function(){
      return [s1,s2];
    },
    sb2: function(){
      return [s3,s4];
    },
    history1: function(){
      return History.find({track:0},{sort: { "date": -1 }} );
    },
    history2: function(){
      return History.find({track:1},{sort: { "date": -1 }} );
    },
  });

  Template.track.events({
  'click button.trk1':function(){
    eatSnds( History.find({track:0},{sort:{"date": -1}}).fetch() );
  },
  'click button.trk2':function(){
    eatSnds( History.find({track:1},{sort:{"date": -1}}).fetch() );
  },
  });

  Template.SoundBoard.events({
    'click .soundBtn': function () {
      // this.playSound();
      var dte = new Date();
      History.insert({track:this.track,description:this.description,date:dte});

    }
  });


}

function eatSnds(snds){
  try{
  var sb = snds.pop();
  History.remove({_id:sb._id});

  var elementPos = sounds.map(function(x) {return x.description; }).indexOf(sb.description);
  sounds[elementPos].sound.play();

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
