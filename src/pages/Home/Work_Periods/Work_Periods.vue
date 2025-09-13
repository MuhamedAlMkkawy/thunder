<template>
  <div class="page_content">
    <div class="form">
      <!-- Loop through the body array to dynamically generate the inputs for each day -->
      <div class="input-wrap" v-for="(item, index) in body" :key="index">
        <div class="inputs">
          <!-- Day Input: Disabled, displaying the day name -->
          <div class="input-tab">
            <label for="day">{{ item.day.name }}</label>
            <div class="input">
              <input 
                type="text"
                id="day"
                v-model="item.day.name"
                disabled
              />
            </div>
          </div>

          <!-- From Time Input: Bound to `item.from` with a placeholder -->
          <div class="input-tab">
            <label for="from">{{ $t('work_periods.from') }}</label>
            <div class="input">
              <input 
                type="time"
                id="from"
                v-model="item.from"
                :placeholder="defaultDays[index].from"
              />
            </div>
          </div>

          <!-- To Time Input: Bound to `item.to` with a placeholder -->
          <div class="input-tab">
            <label for="to">{{ $t('work_periods.to') }}</label>
            <div class="input">
              <input 
                type="time"
                id="to"
                v-model="item.to"
                :placeholder="defaultDays[index].to"
              />
            </div>
          </div>

          <!-- Holiday Switch Input: Bound to `item.is_holiday` -->
          <div class="input-tab">
            <!-- <SwitchInput 
              v-model="item.is_holiday"
              @updateStatus="handlePostSwitch(item, $event)"
            /> -->
            <InputSwitch v-model="item.is_holiday"/>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button class="main-btn" type="submit" @click="handleSubmit"> 
        {{ $t('work_periods.submitBtn') }}
      </button>
    </div>

    <!-- Toast Component for notifications -->
    <Toast 
      ref="toast"
      position="top-right"
    />
  </div>
</template>



<script setup>
  import { onMounted, watch, ref } from 'vue';
  import SwitchInput from '../../../components/SwitchInput.vue';
  import useApiMethods from '../../../Composables/ApiMethods';
  import Toast from 'primevue/toast';
  import { useStore } from '../../../store/store';
  import InputSwitch from 'primevue/inputswitch';

  
  // define store
  const store = useStore()

  // define api methods
  const { getMethod, postMethod, getResult, toast, handleToast } = useApiMethods();

  // define body
  const body = ref([]);

  // Default days with multilingual support (English, Arabic, Urdu)
  const defaultDays = [
    { id: 1, name: { en: 'Sunday', ar: 'الأحد', ur: 'اتوار' }, from: '09:00', to: '17:00' },
    { id: 2, name: { en: 'Monday', ar: 'الإثنين', ur: 'پیر' }, from: '09:00', to: '17:00' },
    { id: 3, name: { en: 'Tuesday', ar: 'الثلاثاء', ur: 'منگل' }, from: '09:00', to: '17:00' },
    { id: 4, name: { en: 'Wednesday', ar: 'الأربعاء', ur: 'بدھ' }, from: '09:00', to: '17:00' },
    { id: 5, name: { en: 'Thursday', ar: 'الخميس', ur: 'جمعرات' }, from: '09:00', to: '17:00' },
    { id: 6, name: { en: 'Friday', ar: 'الجمعة', ur: 'جمعہ' }, from: '09:00', to: '17:00' },
    { id: 7, name: { en: 'Saturday', ar: 'السبت', ur: 'ہفتہ' }, from: '09:00', to: '17:00' },
  ];


  // Watch for changes in the API result and update `body`
  watch(() => getResult.value, (newValue) => {
    if (newValue?.data?.length > 0) {
      body.value = newValue.data.map((item) => ({
        day: item.day, // day object with `id` and `name`
        from: item.from, // start time
        to: item.to, // end time
        is_holiday: !item.is_holiday, // holiday status
      }));
    } else {
      body.value = defaultDays.map((day) => ({
        day: {
          id: day.id,
          name: day.name[store.lang] || day.name.en, // Use current locale or fallback to English
        },
        from: '', // Leave blank to display the placeholder
        to: '',   // Leave blank to display the placeholder
        is_holiday: false,
      }));
    }
  });


  // Handle the switch toggle change and update the specific item
  const handlePostSwitch = (item, switchValue) => {
    item.is_holiday = switchValue;
    console.log(item)
  };

  // Function to format time (24-hour format)
  const formatTo24HourTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  // Handle form submission and post the data
  const handleSubmit = () => {
    // Validate if all required fields are filled
    const isValid = body.value.every((item) => {
      return item.from && item.to; // Ensure 'from' and 'to' are not empty
    });

    if (!isValid) {
      handleToast(
        'error',
        store.lang === 'ar'
          ? 'يرجى ملء جميع الحقول الزمنية قبل الإرسال.'
          : store.lang === 'en'
          ? 'Please fill in all time fields before submitting.'
          : 'براہ کرم فارم جمع کروانے سے پہلے تمام وقت کے فیلڈز کو بھریں۔'
      );
      return; // Stop form submission
    }
    // Proceed with submission if all fields are valid
    const workTimes = new FormData();

    body.value.forEach((item, index) => {
      const formattedFrom = formatTo24HourTime(item.from);
      const formattedTo = formatTo24HourTime(item.to);

      workTimes.append(`worktimes[${index + 1}][from]`, formattedFrom);
      workTimes.append(`worktimes[${index + 1}][to]`, formattedTo);
      workTimes.append(`worktimes[${index + 1}][is_holiday]`, Number(!item.is_holiday));
    });

    postMethod('provider/work-times/store', workTimes, true, '/orders', 'toast');
  };


  // Fetch data when the component is mounted
  onMounted(() => {
    getMethod('provider/work-times', true); // This loads the initial data
  });
</script>



<style lang="scss" scoped>
  @import '../../../assets/scss/mixins.scss';
  .page_content {
    padding: 40px clamp(10px, 4vw, 72px);
    
    .form {
      max-width: 100%;
      align-items: flex-start;
      flex-wrap: wrap;

      .input-wrap {
        margin-bottom: 25px;
        
        .inputs {
          @include displayFlex();
          height: fit-content;
          align-items: flex-end;

          .input-tab {
            flex-grow: 1;

            input {
              @media (max-width: 500px) {
                font-size: 12px !important;
              }
            }

            &:last-of-type {
              flex-grow: 0;
              width: fit-content;
            }

            @media (max-width: 500px) {
              flex-grow: 0;
            }
          }
        }
      }
    }
  }
</style>
