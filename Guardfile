require 'guard/plugin'

# because it's faster than guard-shell
module ::Guard
  class Compiler < Plugin
    def run_all
      $stdout.puts "Compiling\n"
      `ruby ./compile.rb`
    end

    def run_on_changes(_paths)
      $stdout.puts "Compiling\n"
      `ruby ./compile.rb`
    end
  end
end

guard :compiler do
  watch(/main.js/)
  watch(/models/)
  watch(/styles/)
  watch(/templates/)
end
