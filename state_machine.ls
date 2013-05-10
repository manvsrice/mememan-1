state_machine = mixin ->
	# this is hacky but js still doesn't have proxies
	defer ~>
		for fn in (fold1 (++), values (map keys, @states))
			if !@[fn]? then 
				@[fn] = (~>)
		iter @, (fn,key) ~>
			if typeof(fn) == \function then
				@[key] = after fn, (~> @state[key]? ...)
		for state in keys(@states)
			return @setState(state)
	setState: (state) ~>
		@state?.destroy?!
		@state = @states[state]
		@state_start_time = Date.now!
		@state_secs = ~> (Date.now! - @state_start_time)/1000
		@state?.init?!
	states: {}


log state_machine
module.exports = state_machine
