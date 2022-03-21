console.log('client script imprted.');

(function start() {
    const startBtn = document.getElementById('start-btn');
    const endBtn = document.getElementById('end-btn');

    let abortController;

    const fr = new FileReader();
    fr.onload = e => {
        try {
            console.log(JSON.parse(e.target.result));
        } catch (error) {
            console.log(e.target.result);
        }
    };
    fr.onerror = e => {
        console.error(e);
    };

    endBtn.addEventListener('click', e=> {
        console.log('end btn clicked right now...');
        startBtn.style.setProperty('--display', 'inline-block');
        endBtn.style.setProperty('--display', 'none');

        if (abortController) {
            abortController.abort();
            abortController = null;
        }
    });

    startBtn.addEventListener('click', e => {
        console.log('start btn clicked right now...');
        startBtn.style.setProperty('--display', 'none');
        endBtn.style.setProperty('--display', 'inline-block');

        abortController = new AbortController();
        const signal = abortController.signal; 

        fetch('/streamSocket', {
            method: 'GET',
            signal,
        }).then(res => {
            const reader = res.body.getReader();
            

            reader.read().then(function handler({ done, value}) {
                fr.readAsText(new Blob([value]), 'utf-8');

                if (!done) reader.read().then(handler);
                else {
                    console.log('Stream api trans data done...');
                    startBtn.style.setProperty('--display', 'inline-block');
                    endBtn.style.setProperty('--display', 'none');
                    abortController = null;
                }
            }).catch(e => {
                console.error(e);
            })
        })
    });
})();