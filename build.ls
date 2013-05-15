require! {fs,file,exec:child_process.exec}

log "Building project into index.html, please wait..."

###freaking ugly code get out###
count = 0
file.walk __dirname, (a,b,c,d) ~>
	for fname in d when fname.indexOf(".ls")!=-1 and fname.indexOf("build")==-1 and fname.indexOf("index")==-1
		count++
		exec "node "+__dirname+"/node_modules/makels.js "+fname, (a,b,c) ~>
			log b
			count--
			if count==0 then
				exec "node "+__dirname+"/node_modules/makels.js "+__dirname+"/index.ls", (a,b,c) ~>
					log b
