const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("BOT TOKEN"); //Token buraya
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);

//UPTİME

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//OYNUYOR KISMI

client.on("ready", () => {
  console.log("Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setPresence({
    activity: {
      name: "Mücahid Dinç",
      type: "WATCHING",
      url: "URL"
    }
  });
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

//embed hazırlıkları

const help = new discord.MessageEmbed()
  
  .setColor("RED")
   .setFooter(`BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
  .addField("» Bağlantılar", `[\ Sunucuna Ekle](https://discord.com/oauth2/authorize?client_id=) | [:ballot_box: Bota Oy Ver](LİNK) | [\ Destek Sunucusu](https://discord.gg/)`, false)

  .setAuthor(`BOT UpTime | Yardım Menüsü`, )
  .setDescription(
  `**Uptime komudunu kullandıktan sonra sisteme eklenmesi için 3-5 dk bekleyin.**
  
 ** UpTime Servisini Kullanırken \`OT'a DM\` Atarak Kullanın.**

  **!yardım** : Botun yardım menüsünü açar.

  **!ekle <link>** : Eklediğiniz proje linkini 7/24 açık yapar.

   **!göster** : Bot'umuzla uptime olan proje sayısını gösterir.

  **!botbilgi** : Bot'un istastistik verilerini gösterir.


`
      
  );

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send(
            new discord.MessageEmbed()
                .setFooter(`BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
              .setColor("RED")
              .setDescription(`**Bu bot zaten uptime ediliyor.**
              
                             ** Farklı Bir Glitch Linki Denermisin Bu Link Zaten Sistemime Eklendi.**
                              `)
          );
        message.channel.send(
          new discord.MessageEmbed()
              .setFooter(`BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
            .setColor("RED")
            .addField("» Bağlantılar", `[Sunucuna Ekle](https://discord.com/oauth2/authorize?client_id=8) | [:ballot_box: Bota Oy Ver](LİNK) | [Destek Sunucusu](https://discord.gg/) | [:newspaper: Site](https://)`, false)

           .setDescription(`**\Başarılı! Projeniz artık 7/24!**
          
          BOT UpTime Servisini Kullancığınız İçin Teşekkür Ederiz.
          `) 
        );
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(
          new discord.MessageEmbed()
              .setFooter(`BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
                  .setTitle("\`UpTime Servisini Kullanıcaksan Glitch Linkinden Başka Link Kullanma..\`")
            .setColor("RED")
            .setDescription(" **Hata! Sadece düzgün url'ler ekleyebilirsiniz.**")
        );
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!göster") {
    var link = spl[1];
    message.channel.send(
      new discord.MessageEmbed()
        .setFooter("Mücahid Dinç")
        .setColor("RED")
        .setTitle("BOT UpTime  ")
        .setFooter(`BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
        .setDescription(`**Servisi İle Toplam** **\`${db.get("linkler").length}\`**  **Proje Uptime Ediyorum**`)
    );

  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!uptime") {
    var link = spl[1];
    message.channel.send(help);
  }
});

//Mücahid Dinç