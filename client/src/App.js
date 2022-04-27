import {useEffect, useState} from 'react';
import './App.css';
import History from './Components/History/History';
import RepoTree from './Components/RepoTree/RepoTree';
import HistoryService from './Services/HistoryService';
import RepoService from './Services/RepoService';

function App() {
  const [owner, setOwner] = useState('');
  const [repository, setRepository] = useState('');
  const [repoTree, setRepoTree] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [history, setHistory] = useState();
  const [loadingRepo, setLoadingRepo] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const onSubmit = async ({owner, repository}) => {
    setErrorMessage(null);

    try {
      setRepoTree(null);
      setLoadingRepo(true);
      const {data} = await RepoService.getRepo(owner, repository);

      setRepoTree({
        owner,
        repository,
        tree: data
      });

      setLoadingRepo(false);
      getHistory();
    } catch (error) {
      setErrorMessage(error?.response?.data);
    }
  }

  const getHistory = async () => {
    try {
      const {data} = await HistoryService.getHistory();

      setHistory(data);
    } catch (error) {
      console.log('something go wrong with history fetch');
    }
  }

  useEffect(() => {
    getHistory();
    setLoadingHistory(false);
  }, []);


  return (
    <div className='app'>
      <table className='topTable'>
        <tbody>
          <tr>
            <td><h2>Get Repo Tree</h2></td>
            <td><h2>History</h2></td>
          </tr>
          <tr>
            <td>
            <div className='form'>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>owner</label>
                  </td>
                  <td>
                    <input text="text" value={owner} onChange={e => setOwner(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td>
                  <label>repository</label>
                  </td>
                  <td>
                    <input text="text" value={repository}  onChange={e => setRepository(e.target.value)} />
                  </td>
                </tr>
                <tr className='submitRow'>
                  <td colSpan={2}>
                    <button onClick={() => onSubmit({owner, repository})}>Submit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            </td>
            <td>
            <div>
              {loadingHistory && <h4>Loading...</h4>}
              {history && <History historyItems={history} setRepo={onSubmit}/> }
            </div>
            </td>
          </tr>
        </tbody>
      </table>

        {loadingRepo && <h4>Loading...</h4>}
        {repoTree && <RepoTree RepoTree={repoTree} />}
        {errorMessage && <h4>{errorMessage}</h4>}
    </div>
  );
}

export default App;
