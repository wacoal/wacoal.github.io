手順  
2015.06.03  

①  
bitbucketから、  
grunt_first_kit_02  
を任意のローカルディレクトリ（作業ディレクトリ）にクローンする  

②  
grunt-cliをインストールする  
npm install -g grunt-cli  

③  
Bowerのインストール  
npm install -g bower  

④  
Gruntモジュールのインストール  
npm init  
そしてだいたいenter  

⑤  
Bowerでパッケージのダウンロード  
bower init  
途中、nodeにチェック入れる  

⑥  
gruntfile.js  

⑦  
作業ディレクトリにgruntのインストール  
npm install grunt --save-dev  

⑧  
grunt  
とコマンド打つと、足りないモジュールのエラーが出てくるので  
モジュールをインストールする  
npm install モジュール名 -save-dev  
--save-devつけること。pacage.jsonに自動追記してもらうため。  
※必要なモジュールメモ  
assemble  
grunt-contrib-connect  
grunt-ect  
grunt-contrib-compass  
grunt-contrib-concat  
grunt-contrib-cssmin  
grunt-contrib-watch  
grunt-open  
・コピペ用  
npm install assemble grunt-contrib-connect grunt-ect grunt-contrib-compass grunt-contrib-concat grunt-contrib-cssmin grunt-contrib-watch grunt-open --save-dev  

・コピペ用単体ver  
npm install assemble -save-dev  
npm install grunt-contrib-connect -save-dev  
npm install grunt-ect -save-dev  
npm install grunt-contrib-compass -save-dev  
npm install grunt-contrib-concat -save-dev  
npm install grunt-contrib-cssmin -save-dev  
npm install grunt-contrib-watch -save-dev  
npm install grunt-open -save-dev  
/*
grunt-contrib-○○のモジュールをインストールする  
npm install grunt-contrib -save-dev  
⇒これだとデータ多すぎるので、やはりひとつひとつ  
*/  

⑨  
多分これでいける  
