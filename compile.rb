INSERT_REGEX = /INSERT\([^)]*\)/

result = File.open('compiled.js', 'w')
result.write("javascript:(function(){\n")

def compile_file(result_file, file_name)
  file = File.open(file_name)

  file.each do |line|
    if insert_file = line[INSERT_REGEX]
      insert_file['INSERT'] = ''
      compile_file(result_file, insert_file[/[^()]+/])
    else
      result_file.write(line)
    end
  end

  file.close
end

compile_file(result, 'main.js')

result.write('}());')
result.close
