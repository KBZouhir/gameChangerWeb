<template>
    <div class="max-w-screen-xl h-[800px] w-full  mx-auto py-4 p-2 relative">

        <div v-if="status == 'endRoom'">
            <UCard class="md:w-3/5 w-full mx-auto p-8 relative overflow-hidden z-50">
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                    class="w-12 absolute top-0 right-0" alt="" srcset="">
                <img class="mx-auto mb-8 flex dark:hidden " src="~/assets/svg/vectors/alert.svg" />
                <img class="mx-auto mb-8 hidden dark:flex " src="~/assets/svg/vectors/alert-white.svg" />
                <h2 class="text-3xl font-bold text-center mb-4">{{ $t('Thank you for joining the meeting ') }}</h2>
                <p class="text-blueGray-900 dark:text-slate-300 text-center">{{ $t('Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry') }}</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <UButton @click="joinRoom" block size="lg" color="green">Rejoin to meeting</UButton>
                    <nuxt-link to="/">
                        <UButton size="lg" block variant="outline" color="red">Back home</UButton>
                    </nuxt-link>
                </div>
            </UCard>
        </div>

        <div id="call" ref="callRef" class="h-full" allow="camera; microphone; display-capture"></div>
    </div>
</template>

<script setup>
import DailyIframe from "@daily-co/daily-js";

const IFRAME_OPTIONS = {
    position: 'absolute',
    border: '1px solid black',
    width: '100%',
    height: '100%',
    right: '1em',
    bottom: '1em',
};

const route = useRoute()
// Reactive state
const status = ref("home");
const callFrame = ref(null);
const callRef = ref();


const roomLink = route.query.link
const token = route.query.token

definePageMeta({
    layout: 'auth',
    title: 'Forgot password',
    middleware: ['auth']
})



onMounted(() => {
    joinRoom()
})


const joinRoom = () => {

    status.value = ''
    if (callFrame.value) {
        callFrame.value.destroy();
    }

    const logEvent = (ev) => {
        // console.log(ev)
    }


    const joiningMeeting = (e) => {

    }


    const joinedMeeting = (e) => {
        const ps = e.participants
        Object.keys(ps).forEach(p => {
            let participant = ps[p]
            if (participant.owner) {
                callFrame.value.updateParticipant(participant.session_id, {
                    updatePermissions: {
                        canSend: new Set(['video', 'audio']),  
                        hasPresence: false,
                        canAdmin: new Set(['participants', 'streaming']),
                    }
                })
            }
        })
    }

    const updateParticipants = () => {
        let ps = callFrame.value.participants()
        console.log('updateParticipants', ps);

    }

    const participantJoined = (e) => {
        console.log('participantJoined ', e)
    }

    const raiseHand = () => {
        let ps = callFrame.value.participants();
            

            Object.keys(ps).forEach(p => {
                let participant = ps[p];
            console.log(participant);
            
                if (participant.owner) {
                    return;
                }

            });
    }

    const leaveCall = () => {
        if (callFrame.value) {
            status.value = "endRoom"
            callFrame.value.leave().then(() => callFrame.value.destroy())
        }
    };

    const callWrapper = callRef.value;

    const frame = DailyIframe.createFrame(callWrapper);
    callFrame.value = frame;


    frame
        .on("loaded", logEvent)
        .on("started-camera", logEvent)
        .on("camera-error", logEvent)
        .on("joining-meeting", joiningMeeting)
        .on("joined-meeting", joinedMeeting)
        .on("left-meeting", leaveCall)
        .on("participant-joined", participantJoined)
        .on("participant-left", updateParticipants)

    frame.join({ url: roomLink, token: token, showFullscreenButton: true, showLeaveButton: true });

}

onBeforeUnmount(() => {

})
    


</script>

<style scoped>
.wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
}
</style>