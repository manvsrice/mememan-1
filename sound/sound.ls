require! {buzz}
names = <[1up beam_in dead disappearing_block enemy_hit health hurt land pause power_up shoot shot_blocked]>
sounds = {[name, new buzz.sound "sound/"+name+".wav"] for name in names}
global.play = (sound)~>
	sounds[sound]
		..play!
		..setTime 0
