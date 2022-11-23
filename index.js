// const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// // const { ensureLoggedIn } = require('connect-ensure-login');

// var DiscordStrategy = require('passport-discord').Strategy;


// const APPID = process.env['APPID']
// const CLIENTID = process.env['CLIENTID']
// const CLIENTSECRET = process.env['CLIENTSECRET']
// const PASSPORT_SESSION_SECRET = "ADASDASDASD";
// const CALLBACKURL = "http://discord-token-gated-test.philippklein2.repl.co/auth/discord/callback";
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });
// var scopes = ['identify'];

// passport.use(
//   new DiscordStrategy({
//     clientID: CLIENTID,
//     clientSecret: CLIENTSECRET,
//     callbackURL: CALLBACKURL,
//     scope: scopes
//   },
//     function(accessToken, refreshToken, profile, cb) {
//       console.log(accessToken, refreshToken, profile)
//       return cb(null, profile);
//     })
// );

// const app = express();
// //app.set('views', `${__dirn/ame}/views`);
// //app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(session({ secret: PASSPORT_SESSION_SECRET, resave: false, saveUninitialized: false }));

// app.use(passport.initialize({}));
// app.use(passport.session({}));

// app.get('/', (req, res) => {
//   res.send('asdasd');
//   //res.render('index', {
//    //user: req.user,
//   //   validUsers: VALID_USERS,
//   //   activeContracts: getActiveContracts(),
//   //   factories: getActiveFactories(),
//   //   runningSince: runningSince(),
//   //   bcExplorer: BC_EXPLORER,
//   //   abis,
//   //});
// });

// app.get('/auth/discord', passport.authenticate('discord'));

// app.get('/auth/discord/callback', passport.authenticate('discord', {
//     failureRedirect: '/'
// }), function(req, res) {
//     res.redirect('/') // Successful auth
// });

// app.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });

// app.listen(80, () => {
//   console.log( `Admin listening on port 80`);
// });



const { 
  Client, 
  Events, 
  GatewayIntentBits
} = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
]});
console.log(client);
const DISCORDTOKEN = process.env['DISCORDTOKEN'];
console.log(DISCORDTOKEN);
client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
  console.log(JSON.stringify(interaction, null, 2));
	const { commandName } = interaction;
	await interaction.deferReply();
	// ...
});

client.on('message', function(message) {
 console.log(message.content)
});

client.on('guildMemberAdd', (guildMember) => {
  console.log(JSON.stringify(guildMember, null, 2));
  guildMember.addRole(guildMember.guild.roles.find(role => role.name === "ew"));
});

client.login(DISCORDTOKEN);