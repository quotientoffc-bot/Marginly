tell application "Google Chrome"
    make new window with properties {mode:"incognito"}
    set url of active tab of front window to "http://localhost:3000/"
    
    tell front window
        make new tab with properties {URL:"http://localhost:3000/dashboard"}
        make new tab with properties {URL:"http://localhost:3000/dashboard"}
    end tell
    
    delay 1
    
    tell front window
        set active tab index to 3
        execute active tab javascript "localStorage.setItem('user_role', 'manager'); window.location.reload();"
    end tell
end tell
