/*
Automated Bluesky Bot (Node.js)
Posts a random phrase + link every 4 hours via GitHub Actions.

Dependencies:
  npm install @atproto/api

*/

const { BskyAgent } = require('@atproto/api')

const link = process.env.CTA_LINK;


const PHRASES = [
`🎙️ ¿Sabías que te pueden escuchar aunque el móvil esté bloqueado?\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📱 LaLiga ya lo hizo. ¿Quién más lo está haciendo sin que lo sepas?\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`👂 Tu micro está activado más veces de las que imaginas\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🤐 Si tu móvil hablara… te delataría. Protégete\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🔒 ¿Micrófono, GPS, WiFi? Todo se rastrea. Bloquéalo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`👀 Me enteré de lo de LaLiga y cambié todo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😳 Desde que supe lo del micro, no salgo sin esto\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🛡️ Usa esto y que te espíen si quieren… no podrán\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`⚠️ Pensé que era paranoia hasta que vi las pruebas\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🧠 Nadie tiene por qué saber dónde estoy. Ni tú\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🛡️ Esto no es una VPN cualquiera. Es mi escudo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`💀 Puedes seguir confiando en tu operador... o protegerte\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🔐 ¿Privacidad? No existe… hasta que haces esto\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`👂 Hay apps que escuchan más de lo que tú hablas\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😌 Desde que lo instalo, el móvil respira tranquilo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😤 Esto no es para todos. Es para los que se cansaron\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🧪 Lo instalé por curiosidad. Me quedé por seguridad\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🫣 ¿Crees que no te espían? Así pensaba yo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`💬 Pruébalo una vez. Luego lo recomendarás\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🧰 No es magia. Es protección digital real\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😅 Si lo supiera antes, me habría ahorrado muchos sustos\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📲 El botón más importante de tu móvil es este enlace\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`⏳ No esperes a que te pase algo para reaccionar\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🚫 Gratis, rápido y sin datos personales. Esto es lo que uso\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`💎 Protege lo tuyo como si valiera millones. Porque lo vale\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🙈 Esto es para los que ya no confían en “ajustes de privacidad”\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📴 El móvil no es el problema. Es lo que haces con él\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🕵️‍♂️ Lo que estás ignorando, otros lo están escuchando\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📉 Deja de ser un producto. Empieza a protegerte\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`💸 Es más barato que ser hackeado. Y gratis\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📡 Los mismos que te ofrecen apps, te están escuchando\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📶 Si usas tu móvil, usa esto. Punto\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`⚡ Un clic. Y todo cambia\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🧐 No es por paranoia. Es por experiencia\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`👀 Te quejas de que te espían... y usas el WiFi del bar. Anda ya\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😂 Tu ex no te espía, pero tu móvil sí. Prioridades, bro\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🕶️ El FBI viendo tu vida aburrida mientras tú ni VPN usas\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📵 Si no usas esto, mejor apaga el móvil y llévate un walkie\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🤫 Esto no es para todos. Solo para los que sospechan de todo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😏 "No tengo nada que ocultar"... dijo justo antes de llorar\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🤖 Alexa, Siri y Google ya saben lo que hiciste anoche\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`💥 Este clic te protege más que tu madre y tu abogado juntos\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📲 Si llevas el móvil al baño y no usas VPN, estás regalando contenido\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🕵️‍♀️ Si te sientes observado, probablemente es porque lo estás\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🔍 Que no lo veas no significa que no esté pasando\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🫠 Usas modo incógnito y te crees hacker… usa esto mejor\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`💬 Este enlace vale más que todos tus ajustes de privacidad juntos\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🙃 Si sigues usando el móvil así, al menos que te paguen por los datos\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😮‍💨 El micro escucha. El GPS ubica. El bot... te avisa\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📡 La app del banco, la del súper... todas cotillean\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😵‍💫 ¿"Aceptar todo"? No, bro. Acepta esto\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`👻 Te espían más que a un narco con tobillera\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😎 Si vas a vivir paranoico, al menos que tenga estilo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📉 Te venden como usuario, te compran como dato\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`👽 Si crees en aliens pero no en espionaje digital, revisa prioridades\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🥷 Esto no es Black Mirror. Es peor.\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🎯 El móvil no es tuyo. Es de las apps que instalas\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🔇 Silenciar micro ≠ desconectar vigilancia. Hazlo bien\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🛠️ Instalar esto es como poner rejas al móvil\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`💼 Ni tu jefe tiene tantos datos tuyos como tu móvil\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🔥 Esto es como cerrar la puerta cuando vas al baño… pero digital\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🪬 Contra el mal de ojo digital: clic aquí\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🤖 ¿Tu móvil está contigo o tú con él?\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`❓ Si tienes dudas, prueba. Si no las tienes, peor\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`😤 Esto lo instalé el día que LaLiga me cabreó\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`👊 Ya no tengo miedo de que me espíen. Ahora se lo pongo difícil\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🫢 Este es mi truco. No lo digas muy alto\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🧱 Lo llaman VPN. Yo lo llamo chaleco antibalas digital\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`💥 Que te espíen otros… a mí que me busquen\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🛑 Estás a un clic de estar tranquilo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🤔 ¿Por qué nadie habla de esto? Porque funciona\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📣 Esto es lo que recomiendo cuando me preguntan\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🙈 Si lo lees, pruébalo. Si lo ignoras, suerte\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🤷‍♂️ No necesitas entenderlo. Solo activarlo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📵 Tu privacidad no es opcional. Pero te la quitan igual\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`💢 ¿Te dolería más que te escuchen o que no te avisen?\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🚀 Haz clic, activa, y sigue con tu vida\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`📉 No es viral. Pero debería serlo\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,
`🫶 Esto no protege solo tu móvil. Te protege a ti\n🔗 Enlace en mi bio: bit.ly/protegetumovil`,

  
];



async function run() {
  const agent = new BskyAgent({ service: process.env.BSKY_SERVER })

  await agent.login({
    identifier: process.env.BSKY_HANDLE,
    password: process.env.BSKY_PASSWORD
  })

  const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)]

  await agent.post({ text: phrase })

  console.log('Post enviado:', phrase)
}

run().catch(console.error)
