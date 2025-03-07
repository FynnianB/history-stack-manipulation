import { redirect } from 'react-router';

export function clientLoader() {
  return redirect('/input');
}

export default function Index() {
  return null;
}
