echo "Building project..."
find . -name "*.ls" -not -name "index.ls" -exec node node_modules/makels '{}' --debug \;
node node_modules/makels index.ls

