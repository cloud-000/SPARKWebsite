/**
 * Learn React they say, it'll be fun and useful they say...
 * 
 * Well I say "nuh uh", cuz this thing going to be made of pure chaos(no frameworks!!).
 * ...Definitely not because I'm too lazy to learn them...
 */

//load all components/scripts for all pages
(async function() {

    //load all components/scripts
    const scripts = [
        "/src/components/Footer.js",
        "/src/components/Navbar.js"
    ];

    //no clue wth this is. All hail chatGPT
    /*
        async function loadScripts() {...}
            Declares an asynchronous function, meaning you can use await inside it to pause until things are done — in this case, script loading.

        const scripts = ["/src/components/Footer.js", "/src/components/Navbar.js"];
            An array of paths to the script files you want to load.

        Promise.all(scripts.map(...))
            Maps each script path to a promise that resolves when the script is loaded.

        Promise.all([...]) waits for all of these promises to finish.
            It loads the scripts concurrently, not one-by-one.

        scripts.map(src => new Promise(resolve => {...})) For each script path, it:
            Creates a new <script> element.
            Sets src to the current path.
            Sets type to "module" so ES module syntax works inside the file.
            Sets onload = resolve to resolve the promise when the script is fully loaded.
            Appends the script to the document’s <head> so the browser starts loading it.

        Object.assign(document.createElement("script"), { ... })
        This is a shortcut to set multiple properties (src, type, onload) at once, instead of writing:
            const script = document.createElement("script");
            script.src = src;
            script.type = "module";
            script.onload = resolve;
    */
    await Promise.all(scripts.map(src => {
        return new Promise((resolve, reject) => {
            document.head.appendChild(
                Object.assign(document.createElement("script"), {
                    src: src,
                    defer: true,
                    onload: resolve,
                    onerror: () => reject(new Error(`Failed to load script: ${src}`))
                })
            );
        });
    }));
    
})();
