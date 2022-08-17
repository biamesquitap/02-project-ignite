import { HistoryContainer, HistoryList } from "./styles";

export function History() {
  return (
    <div>
      <HistoryContainer>
        <h1> Meu historico</h1>

        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duracao</th>
                <th>Inicio</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tarefa</td>
                <td>20 minutos</td>
                <td>ha 2 semanas</td>
                <td>Concluido</td>
              </tr>

              <tr>
                <td>Tarefa</td>
                <td>20 minutos</td>
                <td>ha 2 minutos</td>
                <td>Concluido</td>
              </tr>

              <tr>
                <td>Tarefa</td>
                <td>50 minutos</td>
                <td>ha 2 semanas</td>
                <td>Concluido</td>
              </tr>

              <tr>
                <td>Tarefa</td>
                <td>40 minutos</td>
                <td>ha 3 semanas</td>
                <td>Concluido</td>
              </tr>

              <tr>
                <td>Tarefa</td>
                <td>20 minutos</td>
                <td>ha 5 semanas</td>
                <td>Concluido</td>
              </tr>

              <tr>
                <td>Tarefa</td>
                <td>30 minutos</td>
                <td>ha 7 meses</td>
                <td>Concluido</td>
              </tr>

              <tr>
                <td>Tarefa</td>
                <td>25 minutos</td>
                <td>ha 1 ano</td>
                <td>Concluido</td>
              </tr>
            </tbody>
          </table>
        </HistoryList>
      </HistoryContainer>
    </div>
  );
}
