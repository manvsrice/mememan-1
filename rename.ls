require! {fs}
i = 0
fs.readdirSync(__dirname)
	|> map (__dirname+"/"+)
	|> map (-> [it, __dirname+"/"+(i++)+".png"])
	|> each (-> fs.rename it[0], it[1]+".png")
