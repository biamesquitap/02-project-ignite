import { HandPalm, Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

import {
  CountdownContainer, 
  Separator,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)


    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...cycles, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset();
  }

  function handleInterruptCycle() {
    setCycles(state =>
      state.map((cycle) => {
      if (cycle.id == activeCycleId) {
        return { ...cycle, interrutedDate: new Date() }
      } else {
        return cycle
      }
    }),
    )

    setActiveCycleId(null)
  }

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
  

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
      
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

        

        useEffect(() => {
          let interval: number

          if (activeCycle) {
            interval = setInterval(() => {
              const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

              if (secondsDifference >= totalSeconds){
                setCycles ((state) =>
                state.map(cycle => {
                  if (cycle.id == activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                  } else {
                    return cycle
                  }
                }),
                )
                setAmountSecondsPassed(totalSeconds)
                clearInterval(interval)
              } else {
                setAmountSecondsPassed(secondsDifference)
              }        
            }, 1000)
          }

          return (
            <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
          </CountdownContainer>
          )
        }



        {activeCycle ? (
          <StopCountdownButton
            onClick={handleInterruptCycle}
            type="button"

          >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            disabled={isSubmitDisabled}
            type="submit"
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
