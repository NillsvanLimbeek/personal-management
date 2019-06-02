import { Vue, Component } from '@/vue-script';

@Component({})
export default class ModalsMixin extends Vue {
    public openModal() {
        console.log('Open Modal');
    }
}
