//requiring modules
const Discord = require('discord.js')
const stayOn = require('./server')

//to interact with the repl.it database
const Database = require('@replit/database')

const { add, update } = require('./util-add')
const { del, reset } = require('./util-del')
const { privacy } = require('./util-privacy')
const { info, help, stats } = require('./util-description')
const { utilProfile , utilStreak, utilList } = require('./util-check')

//new
const { button, getStreak, getProfile, getList } = require('./button')

//instantiating the database object and
//the discord bot to get started
const db = new Database()
const client = new Discord.Client()

//test
//const disbut = require('discord-buttons')(client)
const chalk = require('chalk')
//require('log-timestamp')

// each value element present in the database
// key is the id of user and value is as shown
// {
//   userName,
//   info: [
//     {
//       logged: "logg",
//       date: 1
//     }
//   ],
//   startDate: Date.now()
//   open:true
// }



//db.getAll()
//db.get('691267340846759978').then(console.log)

db.list().then(keys => {
  keys.forEach(key => {
    db.get(key).then(logs => {
      if (logs.userName === 'BasarderGaming#4276') {
        //logs.info.splice(0, 1)
        //logs['startDate'] = 1620138600489
        //logs.info[1].logged = 'Solved leetcode problem in ALL Languages provided in the ide: Py/java/js/cpp/c/c#/ruby/swift/go/scala/kotlin/rust/php/typescript but not racket its pretty fucked up 😅 post [here](https://leetcode.com/problems/pascals-triangle-ii/discuss/1203260/very-easy-on-time-0-ms-beats-100-simple-maths-all-languages)'
        //db.set(key, logs)
        //   })
        //  })
      }
      console.log(logs)
    })
  })
});

//============= bot online listener ==============
client.on('ready', () => {
  console.log(`The Bot is online as ${client.user.tag}!`)
  client.user.setPresence({
    status: 'online',
    activity: {
      name: '++help with discord-buttons.js',
      type: 'LISTENING',
      url: 'https://discord.com/api/oauth2/authorize?client_id=838101838845706300&permissions=2148002880&scope=bot'
    }
  }).then(bot=>{
    console.log(bot)
    console.log(chalk.green(`Logged in as ${client.user.tag}!`));
    console.log(chalk.yellow(`Servers! ["${client.guilds.cache.size}"]`));
    console.log(chalk.cyan(`User Count! ["${client.guilds.cache.reduce((a, v) => a + v.memberCount, 0)}"]`));
  })
    .catch(console.error);
})

//============== message listener ====================
client.on('message', async (msg) => {
  if (msg.author.bot || !msg.content.startsWith("++")) return;

  console.log(msg.author.id + " " + msg.author.tag)
  console.log(msg.channel.type)
  if (msg.content.startsWith("++add"))
    add(msg, msg.content.split("++add")[1].trim())

  if (msg.content.startsWith("++log"))
    add(msg, msg.content.split("++log")[1].trim())

  if (msg.content.startsWith("++update"))
    update(msg)

  if (msg.content.startsWith("++del"))
    del(msg)

  if (msg.content.startsWith("++reset"))
    reset(msg)

  if (msg.content.startsWith("++privacy"))
    privacy(msg)

  if (msg.content.startsWith("++info"))
    info(msg).then(embed => msg.channel.send(embed))

  if (msg.content.startsWith("++help"))
    help(msg).then(embed => msg.channel.send(embed))
  
  if(msg.content.startsWith("++stats"))
    stats(client.guilds.cache.size, client.guilds.cache.reduce((a, v) => a + v.memberCount, 0)).then(embed => msg.channel.send(embed))

  if (msg.content.startsWith("++list"))
    utilList(msg)

  if (msg.content.startsWith("++streak"))
    utilStreak(msg)

  if (msg.content.startsWith("++profile"))
    utilProfile(msg)
  
  //if (msg.content.startsWith("++buttons"))
    //button(disbut, msg)
})

// client.on('clickButton', async (button) => {
//   if (button.id === 'getStreak') {
//     button.defer()
//     getStreak(button)
//   }
//   if (button.id === 'getInfo')
//     info(button).then(embed => button.reply.send('', { embed: embed, ephemeral: true }))

//   if (button.id === 'getHelp')
//     help(button).then(embed => button.reply.send('', { embed: embed, ephemeral: true }))

//   if (button.id === 'getProfile') {
//     button.defer()
//     getProfile(button)
//   }

//   if (button.id === 'getList') {
//     button.defer()
//     getList(button)
//   }

// })

stayOn()
client.login(process.env.TOKEN)