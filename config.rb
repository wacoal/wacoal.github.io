# ************************************
# HTTP Path
# ************************************
http_path = "/"
css_dir = "assets/common/css"
css_dir = "htdocs/common/css"
sass_dir = "assets/common/css/sass"
images_dir = "assets/common/img"
generated_images_dir = "htdocs/common/img"
javascripts_dir = "assets/common/js"

# ************************************
# Other
# ************************************
# .sass-cacheを出力するかどうか
cache = false
 
# クエストにクエリ文字列付けてキャッシュ防ぐ
 asset_cache_buster :none
 
# Sassファイルをブラウザで確認
sass_options = { :debug_info => false }
 
# cssの主力形式
output_style = :expanded
 
# trueで相対パス、falseで絶対パス
relative_assets = true
 
# CSSファイルにSassファイルの何行目に記述されたものかを出力する
line_comments = false
 
# ************************************
# Sprites
# ************************************
# Make a copy of sprites with a name that has no uniqueness of the hash.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
    FileUtils.rm_rf(filename)
  end
end



    
    
    
    
    
    
    
    
    
    
    
    
