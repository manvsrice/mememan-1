dest=$1
echo Creating sprite $1 with colors $2 and $3
mkdir $dest
cp mask/* $dest
cd $dest
mogrify -fill $2 -opaque red *
mogrify -fill $3 -opaque green *
