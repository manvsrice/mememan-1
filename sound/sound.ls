require! {buzz}
names = <[1up beam_in dead disappearing_block enemy_hit health hurt land pause power_up shoot shot_blocked title hardman stage_select]>
sounds = {[name, new buzz.sound "sound/"+name,{formats:["wav","mp3"]}] for name in names}
global.play = (sound)~>
	sounds[sound]
		..play!
		..setTime 0
current_bg_music = void
global.bg_music = (sound)~>
	if current_bg_music? then
		current_bg_music.stop!
	current_bg_music := play(sound).loop().setVolume(40)
	log current_bg_music
