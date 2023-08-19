<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { compoundInterest, simpleInterest } from '../utils/helpers'

const valid = ref(false)

const currentMode: Ref<'simple' | 'compound'> = ref('compound')
const initialAmount = ref(0)
const interestRate = ref(2)
const investmentTermInMonths = ref(12)
const numberOfMonthsPerPayPeriod = ref(1)
const interestPaidSelection = ref('monthly')

const numberRules = ref([
  (v: any) => String(v).length > 0 || 'This field is required',
  (v: any) => Number.isInteger(v) || 'This field must be numeric'
])

function onSelect() {
  interestPaidSelection.value === 'maturity'
    ? (currentMode.value = 'simple')
    : (currentMode.value = 'compound')

  if (interestPaidSelection.value === 'monthly') {
    return (numberOfMonthsPerPayPeriod.value = 1)
  } else if (interestPaidSelection.value === 'quarterly') {
    return (numberOfMonthsPerPayPeriod.value = 3)
  } else {
    return (numberOfMonthsPerPayPeriod.value = 12)
  }
}

const maturityAmount = computed(() => {
  return currentMode.value === 'simple'
    ? simpleInterest(initialAmount.value, interestRate.value, investmentTermInMonths.value)
    : compoundInterest(
        initialAmount.value,
        interestRate.value,
        investmentTermInMonths.value,
        numberOfMonthsPerPayPeriod.value
      )
})
</script>

<template>
  <v-card class="pa-6 bg-white-1 rounded-xl card" max-width="500" rounded="rounded-lg">
    <h1 class="title mb-2">Term Deposit Calculator</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model.number="initialAmount"
        variant="underlined"
        label="Initial Amount"
        placeholder="500"
        required
        :rules="numberRules"
        rounded="md"
      ></v-text-field>

      <v-text-field
        v-model.number="interestRate"
        variant="underlined"
        label="Interest Rate"
        :rules="numberRules"
        required
        rounded="md"
        suffix="% p.a."
      ></v-text-field>

      <div>
        <v-label class="label mb-1">Interest Paid</v-label>
        <v-btn-toggle
          v-model="interestPaidSelection"
          @update:model-value="onSelect()"
          rounded="xl"
          variant="outlined"
          color="orange-accent-1"
          group
          class="d-flex mb-6"
        >
          <v-btn color="blue" size="small" value="monthly"> monthly </v-btn>
          <v-btn color="blue" size="small" value="quarterly"> quarterly </v-btn>
          <v-btn color="blue" size="small" value="annually"> annually </v-btn>
          <v-btn color="blue" size="small" value="maturity"> at maturity </v-btn>
        </v-btn-toggle>
      </div>

      <v-text-field
        v-model.number="investmentTermInMonths"
        variant="underlined"
        label="Investment Term (months)"
        required
        :rules="numberRules"
        rounded="md"
      ></v-text-field>

      <template v-if="!isNaN(maturityAmount)">
        <p class="label">FINAL BALANCE</p>
        <p class="bottom-display"><span class="label">$</span>{{ maturityAmount }}</p>
      </template>
    </v-form>
  </v-card>
</template>

<style scoped>
.card {
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  .label {
    font-size: 0.8rem;
  }
  .title {
    font-size: 1.4rem;
    color: #231f20;
  }

  .bottom-display {
    font-size: 4.4rem;
    color: #6185ba;
  }
}
</style>
