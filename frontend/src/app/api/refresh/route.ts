import {NextResponse} from 'next/server';
import {revalidatePath} from 'next/cache';

export async function GET() {
    try {
        await revalidatePath('/');

        return NextResponse.json({revalidated: true, now: Date.now()});
    } catch (error) {
        console.error('Error revalidating:', error);
        return NextResponse.json({revalidated: false, error: (error as Error).message}, {status: 500});
    }
}
