import {request} from './request';
import {getFingerprint} from '@/utils/fingerprint';

export async function likeRequest(type: string, targetId: string, options = {}) {
    const fingerprint = await getFingerprint();
    return request('/like-record', {
        method: 'POST',
        body: JSON.stringify({type, targetId, fingerprint}),
        ...options
    });
}
