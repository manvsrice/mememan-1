require! {fs}
i = 0
fs.readdirSync(__dirname)
	|> map (__dirname+"/"+)
	|> map (-> [it, __dirname+"/"+i++])
	|> log
	#|> each (-> fs.rename __dirname+it, __dirname+
