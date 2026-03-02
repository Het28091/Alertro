import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, phone, email, requirement } = body;

        const data = await resend.emails.send({
            from: 'Alertro Leads <onboarding@resend.dev>', // Update later with verified domain or stick to dev domain.
            to: ['2821hp@gmail.com'],
            subject: `New Lead: ${name} - ${requirement}`,
            html: `
        <h1>New Lead Received</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Req:</strong> ${requirement}</p>
      `
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
