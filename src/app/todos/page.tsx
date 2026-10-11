import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from('todos').select();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-heading text-forest-950">
          Supabase Quickstart Test
        </h1>
        <p className="text-sm text-forest-800/70">
          Testing connection to: <code className="text-xs bg-cream-200 px-1.5 py-0.5 rounded">{process.env.NEXT_PUBLIC_SUPABASE_URL}</code>
        </p>
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-terracotta-50 border border-terracotta-200 text-terracotta-700 text-sm space-y-1">
          <p className="font-semibold">Supabase Query Note:</p>
          <p>{error.message}</p>
          <p className="text-xs opacity-80">
            If table &apos;todos&apos; does not exist yet in your Supabase database, create it or run the migration script in Supabase SQL editor.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {todos && todos.length > 0 ? (
            todos.map((todo: { id: string | number; name?: string; title?: string }) => (
              <li
                key={todo.id}
                className="p-3 bg-white rounded-xl shadow-sm border border-forest-800/10 text-forest-950 text-sm font-medium"
              >
                {todo.name || todo.title || JSON.stringify(todo)}
              </li>
            ))
          ) : (
            <li className="p-4 bg-cream-100 rounded-xl text-forest-900/70 text-sm">
              Connected successfully! No records found in the &apos;todos&apos; table yet.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
