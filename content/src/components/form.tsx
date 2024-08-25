'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '../components/ui/input';

export default function Setup () {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title:""
    },
  });


  const onSubmit = async (data : any) => {
      console.log(data.title)
      router.push(`/content/${data.title}`)
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
             Generate a Article with JournalistAI 
          </h1>
          <p className="mb-4">Enter the title of Article</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full hover:bg-slate-500' type="submit">Generate</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}