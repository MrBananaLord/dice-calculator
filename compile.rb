INSERT_REGEX = /INSERT\([^)]*\)/

def compile_file(result_file, file_name)
  file = File.open(file_name)

  file.each do |line|
    if insert_file = line[INSERT_REGEX]
      prefix, suffix = line.split(/INSERT\([^)]+\)/)

      if !prefix.to_s.empty?
        result_file.write(prefix)
        result_file.write("\n")
      end

      insert_file['INSERT'] = ''
      compile_file(result_file, insert_file[/[^()]+/])

      result_file.write(suffix)
    else
      result_file.write(line)
    end
  end

  file.close
end

result = File.open('compiled.js', 'w')
compile_file(result, 'main.js')
result.close

result = File.open('bookmarklet.js', 'w')
result.write("javascript:(function(){\n")
compile_file(result, 'main.js')
result.write('}());')
result.close
