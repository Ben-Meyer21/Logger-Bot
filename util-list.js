const Discord = require('discord.js')
const { embedder } = require('./utility')

const listAll = async (msg, logs, open)=>{
  n = logs.length
  display = ""
  final=[]
  prev = -1
  count=0
  pageLimit=512
  //=============== to String and pagify if needed ====================
  while(n--){
    if(logs[n].date!=prev){
      prev=logs[n].date;
      str = "**Day#"+logs[n].date+"**"
      if(str.length+display.length>pageLimit){
        console.log(str.length+""+display.length)
        final.push(display)
        display=""
      }
      display+="\n"+str
    }
    str = "- "+logs[n].logged
    if(str.length+display.length>pageLimit){
      // console.log(`lower if`)
      final.push(display)
      display=""
    }
    display+=str+"\n"
  }
  final.push(display)

  //========== now output if more than one pages are needed ============
  if(final.length!=1){
    n=1
    const embed = new Discord.MessageEmbed().setColor(0x344ceb)
    .setFooter(`Page ${n} of ${final.length}`)
    .setDescription(final[n-1])

    msg.channel.send(embed).then(newMsg => {
      newMsg.react('◀').then(more => {//want more ? XD
        newMsg.react('▶')
        
        //filters
        const upFilter = (r, u) => r.emoji.name==='◀' && !u.bot// && u.id===msg.author.id
        const downFilter = (r, u) => r.emoji.name==='▶' && !u.bot

        const up = newMsg.createReactionCollector(upFilter, {time:open?60000:25000})
        const down = newMsg.createReactionCollector(downFilter, {time:open?60000:25000})

        up.on('collect', (reaction, user) => {
          if(newMsg.channel.type!=='dm')
            newMsg.reactions.resolve('◀').users.remove(user.id)
          if(n===1){
            return
          }
          n--
          embed.setDescription(final[n-1])
          embed.setFooter(`Page ${n} of ${final.length}`)
          newMsg.edit(embed)
          up.empty()
        })

        down.on('collect', (reaction, user) => {
          if(newMsg.channel.type!=='dm')
            newMsg.reactions.resolve('▶').users.remove(user.id)
          if(n===final.length){
            return
          }
          n++
          embed.setDescription(final[n-1])
          embed.setFooter(`Page ${n} of ${final.length}`)
          newMsg.edit(embed)
          down.empty()
        })
      })
      if(!open && msg.channel.type!=='dm'){
        msg.delete({timeout:5000})
        newMsg.delete({timeout:30000})
        //.then(console.log)
        //.catch(console.error)
      }
    })
  } else {
    embedder(msg, final[0]).then(newMsg=>{
      if(!open && msg.channel.type!=='dm'){
        msg.delete({timeout:5000})
        newMsg.delete({timeout:25000})
        //.then(console.log)
        //.catch(console.error)
      }
    })
    console.log(final[0].length)
  }
}

module.exports = {
  listAll
}