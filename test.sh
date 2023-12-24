clang logger.c -o logger -lcurl
./logger
rm logger

crystal logger.cr

dotnet new console
rm Program.cs
dotnet run logger.cs
rm -rf bin obj log-over-http.csproj

cp README.md temp1
dart create . --force
dart pub add http
dart run logger.dart
rm -rf bin lib test .dart_tool .gitignore analysis_options.yaml CHANGELOG.md pubspec.lock pubspec.yaml
rm README.md
cp temp1 README.md

elixir logger.ex

go run logger.go

javac logger.java
java logger

deno logger.js

clisp logger.lisp

ruby logger.rb

rustc logger.rs
./logger

chmod +x logger.sh
sh logger.sh

deno logger.ts

zig build-exe logger.zig
./logger