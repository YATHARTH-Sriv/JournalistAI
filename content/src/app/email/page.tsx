"use client";

import { toast, useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import dbconnect from '@/lib/db/connect';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react'


function Page() {

  const { toast } = useToast();
  const {user}=useUser()
  console.log(user)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const router=useRouter()
  const sendEmail = async () => {
    try {
      await dbconnect()
      const res = await axios.post('/api/email',{name,email});
      if (res) {
        toast({
          title: 'Do Check Your email',
          description: 'Check your email',
          duration: 6000
        });
      }
      console.log(res);
      const response = await axios.post('/api/usercreation', {
        name,
        username,
        credits:3,
        email
      });
      console.log(response);
      if (response) {
        toast({
          title: 'User created',
          duration: 6000
        });
      }
      router.push('/dashboard')
    } catch (error) {
      console.log("Could not be sent");
      toast({
        title: 'Error',
        description: 'Email could not be sent',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className=' h-screen w-full bg-black'>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
      <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={sendEmail}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  </div>

  );
}

export default Page;


  