# Bonus

### Proxy Settings

In order to get through the firewalls with the command line tools, you need to configuration the proxy settings.

#### Windows Proxy Settings

**Windows Only**

In an Windows Command prompt execute the following commands to configure the system wide Windows proxies:

<h4 class="exercise-start">
    Set Windows Proxies
</h4>

```js
setx http_proxy http://[YOUR PROXY SERVER]:[PORT]
```

```js
setx https_proxy http://[YOUR PROXY SERVER]:[PORT]
```
<div class="exercise-end"></div>

#### Bash Shell Proxies 

If you are either going to use the Git bash terminal or are on a non-Windows system, you need to set up the proxies in your bash profile.   Note that this tutorial uses the Windows command prompt.

<h4 class="exercise-start">
    Add the following entries to your bash profile.
</h4>

1. Open the Git bash terminal if on Windows or a terminal for Mac/Linux

1. Open the ~/.bash_profile

    ```bash
    vi ~/.bash_profile
    ```

1. Press i to enter edit mode
1. Add the following 3 lines

    ```bash
    export http_proxy=http://[YOUR PROXY SERVER]:[PORT]
    export https_proxy=http://[YOUR PROXY SERVER]:[PORT]
    export no_proxy=[Your Company Domain],10.0.0.0/8,192.168.0.0/16,localhost,127.0.0.0/8,134.134.0.0/16    
    ```

1. Press the Esc key to exit edit mode
1. Press the : key to enter command mode
1. Enter the key combo wq to save the file and exit vi
1. To immediately activate the changes run:

    ```bash
    source ~./bash_profile
    ```

<div class="exercise-end"></div>


#### NPM Proxy Settings

In a terminal window execute the following commands to configure npm proxies:

<h4 class="exercise-start">
    Set NPM Proxies
</h4>

```bash
npm config set proxy http://[YOUR PROXY SERVER]:[PORT]
```

```bash
npm config set https-proxy http://[YOUR PROXY SERVER]:[PORT]
```
<div class="exercise-end"></div>
