import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export function useSupabase(table, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { filters = {}, orderBy = 'created_at', ascending = false, select = '*', limit } = options;

  const fetchData = async () => {
    setLoading(true);
    let query = supabase.from(table).select(select);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query = query.eq(key, value);
      }
    });

    query = query.order(orderBy, { ascending });

    if (limit) query = query.limit(limit);

    const { data: result, error: err } = await query;
    if (err) setError(err.message);
    else setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [table, JSON.stringify(filters)]);

  return { data, loading, error, refetch: fetchData };
}

export function useSupabaseInsert(table) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const insert = async (records) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from(table).insert(records).select();
    if (error) setError(error.message);
    setLoading(false);
    return { data, error };
  };

  return { insert, loading, error };
}

export function useSupabaseUpdate(table) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (id, updates) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select();
    if (error) setError(error.message);
    setLoading(false);
    return { data, error };
  };

  return { update, loading, error };
}

export function useSupabaseDelete(table) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) setError(error.message);
    setLoading(false);
    return { error };
  };

  return { remove, loading, error };
}
