for (( ;; ))
    do
        echo "1" >> test.txt
        git add -A
        git commit -m "updates"
        git pull
        git push
        # sleep 1
    done
