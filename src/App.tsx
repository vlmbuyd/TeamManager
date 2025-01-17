import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CalendarPage, ExtraCalendarPage } from '@pages/calendar';
import { LoginPage, LoginCompletePage } from '@pages/login';
import { ManagementPage, ExtraManagementPage } from '@pages/management';
import { MemoPage, ExtraMemoPage } from '@pages/memo';
import { MyPage, ExtraMyPage } from '@pages/mypage';
import { SharePage, ExtraSharePage } from '@pages/share';
import { TodoListPage, ExtraTodoListPage } from '@pages/todo-list';
import {
  CreateTeamPage,
  JoinTeamPage,
  TeamPage,
  ShareTeamPage
} from '@pages/team';
import ErrorPage from '@pages/error';
import { ProfilePage } from '@pages/mypage/profile';
import { PortfolioPage } from '@pages/mypage/portfolio';
import MainPage from '@pages/main/main';
import Layout from '@components/Layout';
import { SignupPage } from '@pages/signup/signup';
import { RequireAuth } from '@hooks/useRequireAuth';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <RequireAuth>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* main page */}
            <Route path="/" element={<MainPage />} />
            {/* login page */}
            <Route path="/login-complete" element={<LoginCompletePage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* team page */}
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/create" element={<CreateTeamPage />} />
            <Route path="/team/join" element={<JoinTeamPage />} />
            <Route path="/team/share" element={<ShareTeamPage />} />
            {/* calendar page */}
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/calendar/:id" element={<ExtraCalendarPage />} />
            {/* management page */}
            <Route path="/management" element={<ManagementPage />} />
            <Route path="/management/*" element={<ExtraManagementPage />} />
            {/* memo page */}
            <Route path="/memo" element={<MemoPage />} />
            <Route path="/memo/*" element={<ExtraMemoPage />} />
            {/* mypage */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/:id" element={<ExtraMyPage />} />
            <Route path="/mypage/profile" element={<ProfilePage />} />
            <Route path="/mypage/portfolio" element={<PortfolioPage />} />
            {/* share page */}
            <Route path="/share" element={<SharePage />} />
            <Route path="/share/:id" element={<ExtraSharePage />} />
            {/* todolist page */}
            <Route path="/todo-list" element={<TodoListPage />} />
            <Route path="/todo-list/:id" element={<ExtraTodoListPage />} />
            {/* error page */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </RequireAuth>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
