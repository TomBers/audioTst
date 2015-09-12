History = new Mongo.Collection("History");

if (Meteor.isClient) {



  var SoundBoard = function(dim,col,icon,sound, desc,track){
   this.width = dim[0];
   this.height = dim[1];
   this.colour = col;
   this.icon = icon;
   this.tsound = new buzz.sound(sound);
   this.track = track;
   this.sound = new buzz.sound(sound);
   this.description = desc;

   this.sound.bind("ended", function(e) {
    //  console.log(e);
     eatSnds(History.find({track:track},{sort:{"date": -1}}).fetch());
})

  };


  var s1 = new SoundBoard([250,250],'#58A59D','fa-car','/sounds/Summertime.wav','Summertime',0);
  var s2 = new SoundBoard([250,250],'#0A797D','fa-diamond','/sounds/Bells.wav','Bells',0);
  var s3 = new SoundBoard([250,250],'#A2BA67','fa-adjust','/sounds/Guitar.wav','Guitar',0);


  var s4 = new SoundBoard([250,250],'#58A59D','fa-car','/sounds/Klop.wav','Klop',1);
  var s5 = new SoundBoard([250,250],'#0A797D','fa-diamond','/sounds/RShaker.wav','RShaker',1);
  var s6 = new SoundBoard([250,250],'#A2BA67','fa-adjust','/sounds/Shaker.wav','Shaker',1);

  var s7 = new SoundBoard([250,250],'#58A59D','fa-car','/sounds/SynthStab.wav','SynthStab',2);
  var s8 = new SoundBoard([250,250],'#0A797D','fa-diamond','/sounds/Whistle.wav','Whistle',2);
  var s9 = new SoundBoard([250,250],'#A2BA67','fa-adjust','/sounds/Wub.wav','Wub',2);

  sounds = [];

  sounds.push(s1);
  sounds.push(s2);
  sounds.push(s3);

  sounds.push(s4);
  sounds.push(s5);
  sounds.push(s6);

  sounds.push(s7);
  sounds.push(s8);
  sounds.push(s9);

  // UGLY Keyboard event for Makey Makey input

  $(document).on('keyup', function (e) {
    // console.log(e);
    switch(e.keyCode){
      case 38 : console.log("UP");   eatSnds( History.find({track:0},{sort:{"date": -1}}).fetch() ); break;
      case 39 : console.log("RIGHT"); eatSnds( History.find({track:1},{sort:{"date": -1}}).fetch() ); break;
      case 40 : console.log("DOWN"); eatSnds( History.find({track:2},{sort:{"date": -1}}).fetch() ); break;
      // case 37 : console.log("LEFT"); break;

    }
  });

  Template.track.helpers({
    sb1: function(){
      return [s1,s2,s3];
    },
    sb2: function(){
      return [s4,s5,s6];
    },
    sb3: function(){
      return [s7,s8,s9];
    },
    history1: function(){
      return History.find({track:0},{sort: { "date": -1 }} );
    },
    history2: function(){
      return History.find({track:1},{sort: { "date": -1 }} );
    },
    history3: function(){
      return History.find({track:2},{sort: { "date": -1 }} );
    }
  });

  Template.track.events({
  'click button.trk1':function(){
    eatSnds( History.find({track:0},{sort:{"date": -1}}).fetch() );
  },
  'click button.trk2':function(){
    eatSnds( History.find({track:1},{sort:{"date": -1}}).fetch() );
  },
  'click button.trk3':function(){
    eatSnds( History.find({track:2},{sort:{"date": -1}}).fetch() );
  },
  });

  Template.SoundBoard.events({
    'click .soundBtn': function () {
      this.tsound.play();
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
