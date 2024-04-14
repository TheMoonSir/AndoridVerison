<h2>For use this, download node.js and do Npm install</h2>

For use database prisma 
**Go to ".env"**
Now you can to see:
```
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=UseYourApiKey"
DIRECT_DATABASE_URL="mongodb+srv:/YK/data/Andorid"
```
Then go to https://console.prisma.io/login?utm_source=website&utm_medium=accelerate-page
And click on Contiune with GitHub
And when you creating account click on "New project" and choose name you want
When that created , Click on "Enable Accelerate" Now that asking you to write your Database.
Then use Mongdb `mongodb+srv://<Username>:<Password>@blahblah/andorid` when you done click "Enable Accelerate" , and when that finally done. go to API Keys
And Click "Create API key" and choose name and create. and the thing will say what is your api key.
**Warn: you need to save your key api or you won't get the key again.**

Now go back to .env and do:
 ```
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=ApiKey"
DIRECT_DATABASE_URL="mongodb+srv://<Username>:<Password>@blahblah/andorid"
```

btw full code on LUA:

```lua

local HttpService = game:GetService("HttpService")
local httpService = cloneref(game:GetService('HttpService'))
-- Made by TheMoon (be smart if you want)

getgenv()._Information_ = {
    _HostNameUser_ = "wgtjvmz4mnh"
}

local __ExecuterName = identifyexecutor()
local url = '{server link}/api/v1/Andorid/'..getgenv()._Information_['_HostNameUser_']..'/SendScript'


if __ExecuterName == 'Codex' then

    local function decompile(scr)
        local s, bytecode = pcall(getscriptbytecode, scr)
        if not s then
            return `failed to get bytecode { bytecode }`
        end

        local response = request({
            Url = 'https://unluau.lonegladiator.dev/unluau/decompile',
            Method = 'POST',
            Headers = {
                ['Content-Type'] = 'application/json',
            },
            Body = httpService:JSONEncode({
                version = 5,
                bytecode = crypt.base64.encode(bytecode)
            })
        })

        local decoded = httpService:JSONDecode(response.Body)
        if decoded.status ~= 'ok' then
            return `decompilation failed: { decoded.status }`
        end

        return decoded.output
    end

    getgenv().decompile = decompile

    print('Checking if user exists..')
    game:GetService("StarterGui"):SetCore("SendNotification",{
        Title = "Notification",
        Text = "Please wait.."
    })
    game:GetService("StarterGui"):SetCore("SendNotification",{
        Title = "Welcome "..getgenv()._Information_['_HostNameUser_'].. "",
        Text = "Successfully completed, enjoy to exploit with website! Exploit: "..__ExecuterName,
    })
    

    local response = request(
        {
            Url = url,
            Method = 'GET',
            Headers = {
                ["Content-Type"] = "application/json"
            }
        }
    )

    if response.Success == true then
        while true do
            task.wait(0.2)
            if game:HttpGet(url) ~= '{"error":"Script not found."}' then
                print(game:HttpGet(url)) -- change to loadstring(game:HttpGet(url))
            end
        end
    else
        game:GetService("StarterGui"):SetCore("SendNotification",{
            Title = "Error.",
            Text = "We got an error, please report this to support. Open F9 for see the error message",
        })
        print(response.Body)
    end 

else
    print("Not supported yet.")
end


```
