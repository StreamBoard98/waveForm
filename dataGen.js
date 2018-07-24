const fs = require('fs');
const songSource = require('./sampleData');
const songData = songSource.songs;

const hipster = "Freegan church-key kickstarter, keffiyeh tote bag food truck lorem quinoa microdosing esse culpa enim tumblr. Consequat cronut laborum plaid DIY, blog sartorial qui chartreuse vice. Marfa non crucifix adipisicing sartorial etsy ennui squid echo park. Reprehenderit iPhone gentrify wolf, pug ad cronut elit you probably haven't heard of them forage edison bulb tousled proident green juice snackwave. Gastropub sriracha chillwave pork belly direct trade. Authentic do forage bespoke retro, blue bottle marfa excepteur butcher kickstarter. Aute franzen aliquip, normcore put a bird on it hashtag lo-fi tofu. Chicharrones forage la croix truffaut. 3 wolf moon laborum direct trade, YOLO deserunt hoodie waistcoat 8-bit disrupt VHS. Sunt knausgaard ea, culpa cloud bread fam four loko et hell of do. Pug unicorn drinking vinegar cupidatat. Dolore sed normcore aute kogi. Crucifix selfies banh mi non pug qui beard mollit plaid cronut ethical adaptogen. Beard laborum authentic, bespoke XOXO health goth biodiesel celiac minim hoodie polaroid id. Mixtape gluten-free literally, nisi ea photo booth meggings whatever tote bag fixie. Hammock mumblecore cold-pressed chambray umami glossier. Do man braid pok pok lumbersexual church-key. Wolf slow-carb forage everyday carry. Snackwave quis activated charcoal you probably haven't heard of them celiac. Jianbing +1 everyday carry lorem fanny pack. Duis retro bushwick health goth ethical in. Pug excepteur crucifix, ugh tacos cardigan kitsch irony anim raw denim vegan jean shorts woke. Pork belly cornhole aute, kombucha magna asymmetrical polaroid bespoke tofu prism est next level. Vexillologist tousled af, truffaut godard biodiesel yr crucifix. Post-ironic kogi banjo blue bottle truffaut kickstarter laborum. Listicle fam cliche adaptogen lo-fi offal, taiyaki chicharrones biodiesel ad fingerstache echo park commodo. Green juice mixtape glossier, aliqua messenger bag chambray 8-bit prism viral af pork belly squid poke. Cloud bread godard in ea tempor, live-edge pok pok aute hot chicken la croix cillum fashion axe celiac skateboard. Humblebrag tbh esse, viral artisan ea ut truffaut eiusmod. Cillum flexitarian dolor, hexagon intelligentsia tote bag ea seitan la croix chicharrones tilde paleo. Keytar before they sold out health goth YOLO +1 edison bulb food truck. In food truck slow-carb tote bag aliquip plaid seitan in gastropub pinterest polaroid. Thundercats marfa chambray, raw denim ramps cred you probably haven't heard of them meditation lyft cupidatat palo santo est literally ea. Food truck offal helvetica incididunt twee meditation. Synth pug locavore williamsburg, occupy consectetur lomo. Narwhal scenester hoodie fanny pack excepteur literally cardigan. Cronut incididunt palo santo aliqua, readymade copper mug +1 synth helvetica ut velit. Pinterest YOLO try-hard succulents deserunt scenester cold-pressed venmo ex raclette williamsburg hammock. Food truck kickstarter do, gochujang skateboard authentic sunt distillery ramps copper mug. Coloring book esse austin cronut pop-up. Single-origin coffee selfies cillum disrupt polaroid in. Aliqua knausgaard tilde selvage cardigan. Culpa gochujang tacos tilde et officia williamsburg readymade kitsch ea. Disrupt wolf tumblr waistcoat deep v. Taiyaki stumptown pop-up ethical occaecat shoreditch ad austin schlitz YOLO tote bag blog est anim. Banjo ethical dolore skateboard snackwave kitsch irony listicle aute organic. You probably haven't heard of them fixie beard pork belly tempor. Keffiyeh portland cloud bread sint eiusmod laborum. Ad deep v tacos lomo butcher hexagon pariatur letterpress aesthetic qui nisi poutine. Sartorial occaecat vegan, cold-pressed ut irony jean shorts hoodie. Activated charcoal ut la croix iceland, occupy art party post-ironic skateboard cupidatat food truck sartorial sustainable. Proident slow-carb drinking vinegar letterpress incididunt cillum kickstarter tote bag quinoa marfa reprehenderit.";

const genTime = () => {
  const min = 120;
  const max = 480;
  return Math.floor(Math.random() * (min + max)) + min;
};

const commentDataGen = (string, songLength, songId) => {
  const comments = [];
  let stringArr = string.split(' ');
  
  // construct comments array
  for (let i = 1; i < 15; i++) {
    const commentId = i;
    const max = 10;
    const commentText = [];
    const userImage = '/.mary.png';
    const commentTime = Math.floor(Math.random() * songLength);
    for (let j = 0; j < max; j++) {
      commentText.push(stringArr.pop());
    }
    //assemble comments in an array
    comments.push({
      songId,
      commentId,
      commentText: commentText.join(' '),
      userImage,
      commentTime,
    })
  }
  return comments;
};

const applyComments = (dataSource) => {
  let data = [...dataSource];
  let mapped = data.map(element => {
    const songId = element.id;
    const songLength = genTime();
    const comments = commentDataGen(hipster, songLength, songId);
    element.songLength = songLength;
    element.comments = comments;
    return element;
  });
  return data;
}

let result = JSON.stringify(applyComments(songData));
fs.writeFile('commentedData.JSON', result, (err) => {
  if (err) throw err;
  console.log('The file has been saved!'); 
});
