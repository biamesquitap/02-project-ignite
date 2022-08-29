import { FormContainer, TaskInput, MinutesAmountInput} from "./styles"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from "react-hook-form"

export function NewCycleForm () {
  const newCycleForValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60)
  })
  
  type NewCycleFormData = zod.infer<typeof newCycleForValidationSchema>
  
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleForValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })
  
  return (
    <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestion"
            placeholder="Nome do seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-suggestion">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Cartola" />
            <option value="Estudar" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span> minutos. </span>
        </FormContainer>
  )
}