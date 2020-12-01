import React from 'react'

function TrialScreen({navigation}) {

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus' , () => {



        });

        return unsubscribe;
    }, [navigation]);


    return (
        <div>
            
        </div>
    )
}


export default TrialScreen;