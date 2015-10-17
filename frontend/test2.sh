for (( ;; ))
    do
        echo "2" >> test2.txt
        git add -A
        git commit -m "updates"
        git pull -Xtheirs
        git push
    done
