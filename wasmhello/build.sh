set -e

# Compilation flags
# CPPFLAGS="-std=c++11 -Wall -Wextra"  # Add any desired compilation flags here

# Linking flags
# LDFLAGS="-L/opt/homebrew/Cellar/llvm/16.0.6/lib -L/opt/homebrew/Cellar/llvm/16.0.6/lib/c++ -L/opt/homebrew/Cellar/llvm/16.0.6/lib/c"  # Add any desired linking flags here

# Source files
SOURCE_FILES="main.cpp"  # Add your source files here

# Output executable name
OUTPUT_EXECUTABLE="wasm.wasm"  # Specify the name of the output executable here
#/opt/homebrew/Cellar/llvm/16.0.6/bin/clang++
# Compilation command

# -Wl,--import-memory
# —-no-entry —-export-all —-allow-undefined 
# /opt/homebrew/Cellar/llvm/16.0.6/bin/clang++ --target=wasm32 -nostdlib -O3 -Wl,--no-entry -Wl,--lto-O3 -Wl,--allow-undefined -o wasm.wasm main.cpp
/opt/homebrew/Cellar/llvm/16.0.6/bin/clang++ -Wall -Wextra --target=wasm32 -o wasm.o -c ./main.cpp
/opt/homebrew/Cellar/llvm/16.0.6/bin/wasm-ld -m wasm32 --no-entry --export-all --allow-undefined -o wasm.wasm wasm.o