exec_build = (tsc --module $1 --outdir dist/$2/ && echo '{"type": "$3"}' > dist/$2/package.json)

build: build-cjs build-esm

build-cjs:
	$(call exec_build,commonjs,cjs,commonjs)

build-esm:
	$(call exec_build,es2022,esm,module)